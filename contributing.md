# Contribution Guidelines

Thanks for helping keep this list useful. Please read the bar for inclusion before opening a pull request.

## The bar

An entry belongs here if it is all three of:

- **Working.** It runs today, in simulation or on hardware, and the readme shows how. Scaffolds, empty repos and "coming soon" pages are not listed until they do something.
- **Public.** Anyone can reach it without an invite: a public repository, a Hugging Face model or Space, a published article or video.
- **Microduck-specific.** It targets the Pollen Robotics Microduck. General robotics tools that merely mention the duck, and projects only "inspired by" it, are out of scope.

Forks of the official sandbox are listed only when they add something substantive (a new trained policy, a new interaction mode) and say so.

Anything not yet validated on a physical robot should be labeled *sim-only* in its description, and hardware-facing tools should say so honestly. This is a pre-hardware ecosystem; nobody is penalized for that, but readers must not be misled.

## Format

- Add one entry per pull request, at the end of the most relevant section.
- Format: `- [Name](link) - Description.` Use the project's own name and capitalization.
- Descriptions are one sentence, start with a capital letter, end with a period, and say what the thing does, not why it is great.
- Link to the repository or canonical page, not to a tracker, shortener or referral URL.
- No trailing whitespace, no hard-wrapping, and check your spelling.
- Run `npx awesome-lint` locally before submitting; the same check runs on every pull request.
  If it reports `Awesome list must reside in a valid git repository` or `Invalid GitHub repo URL`, that is the linter looking for a GitHub remote, not a problem with your entry — run it in a clone of your fork rather than a downloaded copy, and the rest of the checks will still tell you what you need.

## Pull request

- Title: `Add Name of Project`.
- Body: one line on what it does and one line on why it clears the bar above. Say if you are the author.
- If you are removing or moving an entry, say why.

Maintainers may edit descriptions for consistency. If you disagree with a decision, open an issue; the list follows the [awesome manifesto](https://github.com/sindresorhus/awesome/blob/main/awesome.md).

## Assets and trademarks

This list links to projects; it does not host their code, images or branding. Do not add Pollen Robotics or Hugging Face logos, product photography or press-kit renders to this repository — the press kit grants those for press coverage, not for decorating a third-party project, and using them here would imply an endorsement that does not exist. Any illustration in this repository must be original work we can license ourselves.

When you submit a project, make sure its own readme is honest about the same thing: community work should not present itself as official.
