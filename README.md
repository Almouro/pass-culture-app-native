# PassCulture

This project and readme have been auto generated by [react-native-make](https://github.com/bamlab/react-native-make)

## Getting Started

### Workstation SetUp (for Android)

#### Install NVM (optional)

You can follow this tutorial:
`https://www.liquidweb.com/kb/how-to-install-node-version-manager-on-ubuntu/`

#### Install nodejs

If you have already installed NVM, a .nvmrc file at project root allow you to directly setup the expected version like this:
`nvm use`

#### Install React Native CLI

`npm install -g react-native-cli`

#### Install Android Studio and Android SDK

`https://developer.android.com/studio`

#### Install KVM utility

`sudo apt install qemu-kvm sudo adduser <Replace with username> kvm sudo chown <Replace with username> /dev/kvm`

#### Configure Android PATH

Add ANDROID to your current PATH env var, by adding theses line in your .bashrc:
`export ANDROID_HOME=$HOME/tools/sdk export PATH=$PATH:$ANDROID_HOME/tools export PATH=$PATH:$ANDROID_HOME/platform-tools`

## Installation

Verify if `jq` (dependency required for parsing then inserting `CFBundleVersion` in `Ìnfo.plist`) is installed :

```bash
which jq
```

If not found, install it :

```bash
brew install jq
```

Then :

```bash
git clone <repo_url>
cd pass-culture-app-native
bundle install
yarn
bundle exec pod repo update
cd ios
bundle exec pod install
```

### Run the app

#### Android

In order to launch the app in your simulator, you need to go to Android Studio first.
Then open the Android Virtual Devices Manager and select (or create) a Virtual Device with the android version you want to run.
Once the emulator is up and running, go to your terminal in the project workspace and run the following command:
`yarn install yarn android:testing`

##### Development environment

To run the app on a development environment in order to request a local API, you need to create a `.env.development` file,
copy the `.env.testing` configuration and update the `API_BASE_URL` setting with you local server address. Then create a
`keystores/development.keystore.properties` under `/android` directory with this configuration (required in `build.gradle`):

```
keyAlias=passculture
storeFile=development.keystore
storePassword=
keyPassword=
```

You will also need to copy the `google-services.json` file (you can find it in 1password) in `android/app` directory.

Then run the app with this command:

`yarn android`

#### IOS

You will need to get the `GoogleService-Info.plist` file in this `ios` directory.
You can get a copy of the testing configuration one through the password manager.

And then, you can run the following command:
`yarn ios:testing`

### Debugging

#### Tools

You can install [Flipper](https://fbflipper.com/) that will help you visualize the application's logs and network information.
We recommend installing the plugin `react-query-native-devtools` to analyze react query. This plugin is available through `Manage Plugins` > `Install Plugins`: `react-query-native-devtools`. This should work without further configuration for both platforms.

## Features

When you generated the repository with [react-native-make](https://github.com/bamlab/react-native-make) the following feature must be present:

- A repository should have been created at https://github.com/bamlab/project-name
- An application have been created and deployed on appcenter
- You can deploy automatically with fastlane to appcenter
- You can deploy with codepush to staging too
- We installed the following libraries for you:
  - @react-native-community/async-storage
  - react-native-localize
  - lingui-js
  - typesafe-actions
  - jest
  - prettier
  - eslint

## Finding specific features location

To find where a feature is installed / used, run a search on the whole project using the tag

| Name             |  Tag              |
| ---------------- | ----------------- |
| Translations     | @translations     |
| React Navigation | @react-navigation |
| CodePush         | @codepush         |

## Testing

You can run the tests with `yarn test`. This command will:

- Run `eslint` on your project
- Check the typescript types
- Run the `jest` tests

You can run the jest tests in watch mode with:

```bash
yarn jest --watch
```

You can also get the coverage with:

```bash
yarn jest --coverage
```

## Deploy to AppCenter

- https://appcenter.ms/orgs/pass-Culture/apps/passculture-<ENV:testing|staging>-ios
- https://appcenter.ms/orgs/pass-Culture/apps/passculture-<ENV:testing|staging>-android

### Soft deploy (Code Push)

Most of the time, on testing, you didn't change anything in the native code. If you changed only javascript code, deploy will be **automatic** on CircleCI (deploy-soft-testing job).
Then the build is faster as only the javascript code is published.

To download updates from the application, just open it and click on the "check update" button.

### Hard deploy

If I modified native code, I need to hard deploy:

- `git checkout master`
- `git pull`
- `yarn version:<env>` (this will create a commit with a tag)
- then run `git push --follow-tags`
  You can then check you job on CircleCI.

### Deploy to staging

We do it once a week at the end of an iteration.

When you want to deploy the current version of master in staging, you can run the following command:

`yarn trigger:staging:deploy`

## Troubleshooting

If you don't know what's happening in your application, you can still access the log with ADB:
`adb logcat`

### React Native

If you encounter this error during `react-native start` command:
`Error: ENOSPC: System limit for number of file watchers reached`

You can run the following commande line:
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

### Android Emulator

In Android Studio, when you want to start a virtual device, you might encounter this error message:
`Could not start AVD`

This might be linked to some missing permission on `/dev/kvm`. Try changing the ownership with your current user like this :
`sudo chown <YourUsername> /dev/kvm`

### Android: No value has been specified for property 'manifestOutputDirectory'

In Android Studio: File > Settings > Experimental > Gradle -> uncheck "Only sync the active variant" checkbox.

## Documentation

### Dev standards

In `doc/` folder you will find the `dev standards` the team members follow.
Standards can of course be improved and new ones can be added.

To do so:

1. Create a pull request with the standard modification/addition (use `TEMPLATE.md` for addition)
2. Ask **all** team members to read your PR

--> Why: so that the team is aligned on how to code, and the best way to do something is shared within all members

3. Make sure you got the approval of every member of the team
4. You can merge :)

## Test data

### Accounts

You can use test accounts:

- email: `pctest.jeune93.has-booked-some@btmx.fr`
- mdp: `user@AZERTY123`
