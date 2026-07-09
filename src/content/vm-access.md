---
title: Accessing the Digital Ocean VM
---

# Accessing the Digital Ocean VM

For **Assignment 4** and the **project**, we are providing you with a VM on Digital Ocean. You will access this VM using an SSH key pushed to your Github account.

> **⚠️ Important:** Each VM is tied to your Github repository name. **Do not ever rename your Github repository.** This will duplicate your VM and we might cut your access permanently.

## 1. Get your SSH public key

Get the SSH public key of your SSH client.

If you are on Linux or Mac it is the file `~/.ssh/id_rsa.pub`.

The SSH public key should look like this (ed25519 version):

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKmnmPgELBZTuNV3FcdDOOBifTCl1C8BTPB0M8iLK7Kz john.doe@example.com
```

or (rsa version):

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCnc7TQ8ccdXDCsNXgX1eNtVwvIR110Gzcu6iC9ErR68f7GYF6rsDHmgOZut+6SyU7TEgGA6y6Tqt+9OMs5XV3Epj90IdhPMUNxgfHCaYf9EQczMKKcwkeoR/FhcypGMu4y8gOyYZedlaecSBEvddWmVEwyYXtLjW1X0e7CYGzdZVUDJ6V8cuBQB+rM6NMkcVYWS+ZPTpwZESselLAGwC8SjwjN/6OCyvTpnTaRwBiczbQOB8KbEWW+Paoex4z4rATJ8PLjPl5TQO24sYLWrQgWNHWvcdzbKYT8VSxmq70opMl6GlTyUCOwbbHjFW4k69pQCdoVv5rAEdv9la+s5frxdeDi+NltsA9UCKKzjciuTMxl2Oy8mC8cMv4DvbYEPW0+E2yaMXM3Et3UO58Z+uNnavJCFXIMT4le7czqU+Mwm4qZf5lTlmJeZHx+gVWAf9dm0RV/tPAkKmsnSr01l1/0xzPuhCCRTKjs20ELWAKD05Oeqmcfnk6rTZV6n7GtXnU= john.doe@example.com
```

The last part of the key, `john.doe@example.com`, can be any kind of text string — it does not matter.

You can share your public key with anyone and/or copy it on any machine. Nobody can do anything with just your public key. However, do keep your private key safe (`~/.ssh/id_rsa`). **Never share or copy your private key anywhere.**

If you do not yet have an SSH key, you may follow [the instructions here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) to generate one.

## 2. Push your keys to your repo

Copy all SSH public keys in a file called `./SSH_KEYS` pushed to your Github project repo, the one created through Github Classroom.

Make sure to have **one key per line**. The `./SSH_KEYS` file should look like this:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKmnmPgELBZTuNV3FcdDOOBifTCl1C8BTPB0M8iLK7Kz john.doe@example.com
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAeCz0aA/FKnWUzssML1Eu2LtLuT9YgpYbjtf8UfM6AX jane.doe@example.com
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEdkyWGCfLva+23XyUtZ1NElPtXk/FfWKZk0GYZGuTU3 justa.doe@example.com
```

> **📝 Note:** There is a script that collects those keys and updates your VM every hour. Therefore, once your file has been pushed to Github it can take up to **1 hour** to get updated and grant you access to your VM.

## 3. Access your VM

Access your VM using your SSH client. Replace `repo_name` with the name of your repo:

```
ssh root@repo_name.amazingcloud.space
```

Or if you want to pass the private key to the command:

```
ssh -i /path/to/my_private_key root@repo_name.amazingcloud.space
```
