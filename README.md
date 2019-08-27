
# Envboard - Send your environment to new developers.

## The Pain

Congratulations, so you've got a new developer.

Oh wait. You have to onboard them.

This could last days (probably weeks) before your new developer is effective.

You need to:

- Set up new accounts relating to the developer.
- Ensure they have access to the required repositories.
- Ensure that their environment variables and secrets are shared (in)securely.

I don't know about you but I've sent keys, passwords and (secure) bits n bobs via slack. I know its wrong, I don't want to get in the habit.

Not only that, if the documentation isn't up to scratch it get be extremely painful to get projects working locally, especially in JS land.

Some (many) projects commit their files to source control. <- very very naughty.

## The Goal

Reduce invisible developer onboarding costs with simple and secure configuration management.

Reduce frustration of your new developer and reduce the pressure on other team members to help new team members get up to speed.

Remove the problem "It works on my machine".

This means ensuring that there is a documentation file that is kept up to date, this is a problem in many startups as there isn't time or a immediate need.

This is important, this will reduce the bus factor.

These would be some of the overarching targets, beyond the initial proof of concept:

- Store for sharing configuration files
- Share to team members and guests (that don’t need access to a GitHub)
- Create specific env files and deploy to projects.
- Eliminate the need for **.env** files in source control (this is super bad anyway!).
- Share basic documentation and useful links, Postman.

Fully encrypted. Reduce slack/email sharing.

For **guest** developers this could be a prospective team member that you want to test for an interview but you want to provide the documentation and files that they need to hit the ground running.

## Proof of concept

This initial CLI tool is extremely simple, its goal is to prove the concept.

### Prospective Workflow

1) Create a **.env** file with optional documentation.
2) Use the **envboard** CLI tool to generate a unique key, encrypt and email the zip to a developer.
3) Once the file has been downloaded the files will be destroyed.
4) Manually share the key to the desired user to decrypt the files.

### Installation (Subject to change - not ready)

```
npm i -g envboard
cd project/
```

### Send Environment Variables

```
envboard -e .env -d README.md -s info@mattsmithies.co.uk
```

### Long form, descriptive names.

```
envboard --env .env --doc README.md --send info@mattsmithies.co.uk
```

### No documentation

```
envboard --env .env --send info@mattsmithies.co.uk
```

### Generating and sending the key

For now we'll expect to manually send the key to a developer via a separate email or messaging app.

```
$ envboard -e .env -d README.md -s info@mattsmithies.co.uk
Generating envboard key
Preparing the zip with your files
Sending the package
Share this key with your developer to decrypt: sgrhqbr22nen6ded3q864m
```

## Q & A

Currently this is a proof of concept, and has been shared with various developers and CTOs. We want to check if this is something that is a real pain point to craft into a product.

Lastly, would this functionality be worth $1 a month to you?

Email me for feedback or discuss [info@mattsmithies.co.uk](mailto:info@mattsmithies.co.uk)
