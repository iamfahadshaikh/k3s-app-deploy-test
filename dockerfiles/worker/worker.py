import redis
import psycopg
import time
import os

# Retry logic for startup dependencies
def wait_for_services():
    while True:
        try:
            r = redis.Redis(host=os.getenv("REDIS_HOST"), port=6379, db=0)
            r.ping()
            conn = psycopg.connect(
                host=os.getenv("DATABASE_HOST"),
                dbname=os.getenv("DATABASE_NAME"),
                user=os.getenv("POSTGRES_USER"),
                password=os.getenv("POSTGRES_PASSWORD"),
            )
            return r, conn
        except Exception as e:
            print(f"Waiting for services... {e}")
            time.sleep(5)

r, conn = wait_for_services()

print("Worker started, waiting for jobs...")

while True:
    try:
        item = r.brpop('queue:items', timeout=5)
        if item:
            _, value = item
            print(f"Processing item: {value}")
            with conn.cursor() as cur:
                cur.execute("INSERT INTO processed_items (data) VALUES (%s);", (value,))
                conn.commit()
        time.sleep(1)
    except Exception as e:
        print(f"Worker error: {e}")
        time.sleep(5)
