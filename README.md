# NewGame scrapping helper

## Dependencies

- NVM: <https://github.com/nvm-sh/nvm>

## Quick start

```sh
# Install everything
nvm install
npm i

# Open the website
npm run test

# Open Chrome without CORS
open /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir="$TMPDIR/testing-launcher" 'http://localhost:8080/testing-launcher.html'
```

## Description of the project

- `testing-launcher.html` is helper file to login in LeoVegas, get the game launcher and bypass the arguments to the `index.html` file.
- `testing-launcher.json` contains the credentials and information for the testing session.

NOTE: The files `testing-launcher.*` are only indended for testing, it helps to do the calls on backend to get session and arguments from the real launcher. Those won't be used on the final product.

- `index.html` is the file you work on as starting point to launch your scrapping game. This is up to you to modify and work with it. The arguments bypass to this file are the same from the launcher in LeoVegas (which using the `testing-launcher.html` file, it does automatically as helper).

NOTE: The `index.html` file will be the actual file the product will call. It will pass the same arguments than the `testing-launcher.html` did, but from other technologies (e.g. iOS).
