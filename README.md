  # dra-web-frameworkless

This is a DRA to fetch weather with native web APIs. It renders server side and
uses the same script to power dynamic changes on the frontend. The frontend
bundle is 3.27 kB.

## Usage

Clone the repo:

```bash
git clone git@github.com:TandemSeven/dra-web-frameworkless.git

cd dra-web-frameworkless
```

Install the dependencies and run the local server:

```bash
npm install

npm start
```

Next, go to http://localhost:3000/

From there, you can change the ZIP using the path. Some examples include:

- http://localhost:3000/90210 (Beverly Hills, CA)
- http://localhost:3000/10001 (New York, NY)
- http://localhost:3000/60601 (Chicago, IL)
