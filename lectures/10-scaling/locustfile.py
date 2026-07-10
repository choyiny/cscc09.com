import random
import secrets

from faker import Faker
from locust import HttpUser, task, between, TaskSet


class MicroblogBehavior(TaskSet):
    fake = Faker("en_CA")

    message_ids = set()

    def on_start(self):
        """
        Sign up for an account on microblog.
        """
        self.username = self.fake.email()
        self.password = secrets.token_hex(32)
        payload = {
            "username": self.username,
            "password": self.password
        }
        self.client.post("/users/signup/", json=payload)
        self.client.post("/users/signin/", json=payload)

    @task(1)
    def get_messages(self):
        self.client.get("/api/messages", params={"page": 0})

    @task(1)
    def post_message(self):
        response = self.client.post("/api/messages", json={
            "content": self.fake.text()[:40],
            "username": self.username
        })
        self.message_ids.add(response.json()["id"])

    @task(5)
    def vote(self):
        try:
            msg_id = random.choice(list(self.message_ids))
            self.client.patch(
                f"/api/messages/{msg_id}",
                json={"action": random.choice(["upvote", "downvote"])},
                name="/api/messages/$message_id"
            )
            # have a 30% chance of removing it from the set
            if random.random() < 0.3:
                self.message_ids.remove(msg_id)
        except IndexError:
            # nothing to vote
            pass


class MicroblogUser(HttpUser):
    tasks = [MicroblogBehavior]
    min_wait = 1000
    max_wait = 3000
    wait_time = between(1, 2.5)