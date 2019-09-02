
# Envboard - Empower new developers, securely send your onboarding secrets.

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

This means ensuring that there is a documentation and environment files that is kept up to date, this is a problem in many startups as there isn't time or a immediate need.

This is important, this will reduce the bus factor.

These would be some of the overarching targets, beyond the initial proof of concept:

- Store for sharing configuration files
- Share to team members and guests (that don’t need access to a GitHub)
- Create specific env files and deploy to projects.
- Eliminate the need for **.env** files in source control (this is super bad anyway!).

Fully encrypted. Reduce slack/email sharing.

For **guest** developers this could be a prospective team member that you want to test for an interview but you want to provide the documentation and files that they need to hit the ground running.

## Proof of concept

This initial CLI tool is extremely simple, its goal is to prove the concept.

### Prospective Workflow

1) Create a **.env** file with optional documentation.
2) Use the **envboard** CLI tool to generate a unique key, encrypt and email the zip to a developer.
3) Once the file has been downloaded the files will be destroyed.
4) Manually share the key to the desired user to decrypt the files.
5) If the file already exists the downloaded file will have a js moment timestamp prefix in the format **YYYY-MM-DD-HHmmss_** to not override any sensitive data.

### Installation

```
npm i -g envboard
envboard -h
cd your_project/
```

### "Push" a file to a developer

Use:

```
envboard push <filepath>
```

This will display a CLI wizard workflow to enter the developer's email and company name.

1) A unique password/key will be generated.
2) The file will be encrypted with AES256 encryption.
3) An email will be sent to the developer with a unique reference string.
4) The password will need to be shared with the developer to decrypt the file.

**Note**: The maximum size of a file can be 10kb.

```
$ envboard push .env
? [ 1 / 3 ] What is the email of the team member that you want to sent this to? info@mattsmithies.co.uk
? [ 2 / 3 ] What is the company that you work for? Happy Titan
? [ 3 / 3 ] The file will be encrypted locally, and then be sent to Envboard. You will need to manually send the generated password to the team member. Do you accept?
Yes
Generating Password...
Encrypting file - env.example.enc...
Uploading encrypted file to Envboard
Email sent to info@mattsmithies.co.uk
*-------------------------------------*
Send this password to your team member:
f3b37707448040999de9d29a240ca9bf
*-------------------------------------*
Cleaning up temporary files...

```

### "Pull" a file from Envboard

Use:

```
envboard pull
```

A CLI wizard will start for the unique reference to be entered and the password that is shared from the original developer.

1) The reference looks up a file and downloads from **Envboard** (S3)
2) The password is used to decrypt on the client-side.
3) The remote file is deleted upon successful decryption.
4) If another file is required simply ask for a team member to send another one.

```
$ envboard pull
? [ 1 / 2 ] What is the unique file reference you received?  7d79d9fc-4977-4814-8791-7a89a8ed4498:.env
? [ 2 / 2 ] What is the generated password for the encrypted file? f3b37707448040999de9d29a240ca9bf
Downloading encrypted file from Envboard
Decrypting file and saving to - .env-envboard...
Deleting remote encrypted file in Envboard
```

Once the file has been downloaded and decrypted once this will display if the same reference is used again. This will also show if the reference is incorrect.

```
...
Downloading encrypted file from Envboard
NOT FOUND: Check that the reference is correct or the file has been downloaded already
```

If the password is incorrect for the given reference this warning will appear, the file can still be downloaded.

```
...
Downloading encrypted file from Envboard
Unable to decrypt and save file
```

## Q & A

Currently this is a proof of concept, and has been shared with various developers and CTOs. We want to check if this is something that is a real pain point to craft into a product.

I consider the password to unlock the shared file to be a low risk item, and as such I fully expect it to be shared on slack or email. It can only be used once to download and decrypt the sensitive files.

Email me for feedback or discuss features that would help accelerate the onboarding of new technical talent [info@mattsmithies.co.uk](mailto:info@mattsmithies.co.uk)
