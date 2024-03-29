# Meetin.gs Chrome Extension

## Setup

`git clone git@github.com:meetings/chrome-extension.git`

Then open [chrome://extensions](chrome://extensions), click "Load unpacked extension..." and navigate to the `chrome-extension` directory you just cloned.

## Testing

To test that the extension works as expected:

- click the Meetin.gs icon that has appeared to the right of the search/URL input box - you should see a dropdown which will show different links depending on whether you're logged in or not
- navigate to a Highrise contact - you should see a "Schedule Meeting" button that you can click

## Distribution

Use the "Pack extension..." option on the same page as when installing above, together with the private key.

## Store Submission

First, make sure that `permissions` URL in `manifest.json` to point to the production server.

Then, incremenet the [version number](https://github.com/meetings/chrome-extension/blob/master/manifest.json#L3) in `manifest.json`.

To submit an updated version of the extension to the store, zip up the contents of the `chrome-extension` (there is a package.sh script for that) directory and upload it via the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard). Make sure you click the "Publish Changes" button at the bottom of the page to actually publish the updated version.
