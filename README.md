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

### Build the app

To be able to build the app, you need to configure sentry:

Run `yarn sentry:configure` and select the project `application-native`. This should create 2 files `sentry.properties`, in the `ios/` and `android/` folders.

The content of this file should look like that:

```
defaults.url=https://logs.passculture.app/
defaults.org=sentry
defaults.project=application-native
auth.token=<token>
```

The token is available in your sentry account: https://logs.passculture.app/settings/account/api/auth-tokens/.

### Run the app

#### Android

In order to launch the app in your simulator, you need to go to Android Studio first.
Then open the Android Virtual Devices Manager and select (or create) a Virtual Device with the android version you want to run.
Once the emulator is up and running, go to your terminal in the project workspace and run the following command:
`yarn install yarn android:testing`

##### Development environment

To run the app on a development environment in order to request a local API, you need to create a `.env.development` file,
copy the `.env.testing` configuration and update the `API_BASE_URL` setting with you local server address.

Make sure you also overload the `BATCH_API_KEY_ANDROID` and `BATCH_API_KEY_IOS` variables with the _dev_ values of the _testing_ [batch project](https://dashboard.batch.com/).

Then create a
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

## Deployment

See doc [here](./doc/deployment/deployment.md)

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

- email: `pctest.jeune97.has-signed-up.v2@example.com`
- mdp: `user@AZERTY123`

## API Schema

To update the API schema,

- pull the `swagger-codegen-cli-v3` image: `docker pull swaggerapi/swagger-codegen-cli-v3`
- run: `yarn generate:api:client`

If the file `src/api/gen/.swagger-codegen/VERSION` changes, make sure you locally have the desired version of `swagger-codegen-cli`, otherwise run `docker pull swaggerapi/swagger-codegen-cli-v3:3.0.24`
