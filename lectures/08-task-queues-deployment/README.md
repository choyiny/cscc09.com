# datastores.yml

1. Ensure Docker is currently running on your machine.
2. Spin up the example docker containers.

```
$ docker-compose -f datastores.yml up -d
```

3. You should also verify your installation by running docker ps. You should get an output similar to the following.

```
$ docker ps
CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS              PORTS                                            NAMES
564dec4c7749        mongo:4.2.7-bionic            "docker-entrypoint.s…"   1 minute ago        Up 30 seconds           0.0.0.0:27018->27017/tcp                         07-deploying_mongo_1
1d2cdf33bf7c        postgres:12                   "docker-entrypoint.s…"   1 minute ago        Up 30 seconds           0.0.0.0:5434->5432/tcp                           07-deploying_postgres_1
dd7bb600c0b8        redis:5-alpine                "docker-entrypoint.s…"   1 minute ago        Up 30 seconds           0.0.0.0:6379->6379/tcp                           07-deploying_redis_1
```

> Note: All docker containers are set to restart always, so the containers should spin up automatically even after computer restart. Theoretically, you will never need to run this again, but if you realize that you cannot connect to your local database, run step 2 again.

You can manage the databases with these credentials

- PostgreSQL 12 (postgresql://cscc09:cscc09@localhost:5434)
- MongoDB (mongodb://cscc09:cscc09@localhost:27018/admin)
- Redis (redis://localhost:6379/<1-16>)
- Kafka (localhost:9092)
