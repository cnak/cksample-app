# App

## Getting Started

Install the dependencies

```bash
yarn install
```

Start expo development server locally

```bash
yarn start
```

#### iOS

To be able to run the iOS emulator, you will need to have the [Xcode](https://developer.apple.com/xcode/) installed.

Start expo development server locally and open iOS emulator

```bash
yarn ios
```
#### Android

To be able to run the android emulator, you will need to first install [Android Studio](https://developer.android.com/studio) and [create an emulator device](https://developer.android.com/studio/run/managing-avds).

Start expo development server locally and open Android emulator

```bash
yarn android
```

### Configuration


## Testing

### Unit Tests

Unit tests are run using jest test runner.
You can run unit tests with
```bash
yarn test
```

### E2E Tests

End to end tests are using detox test runner. To run the end to end tests on iOS, you need to have expo binaries
and applesimutils available.

#### Initial setup

```bash
yarn dl_expo_bins
brew install applesimutils
```

You can then run detox e2e tests with

```bash
yarn e2e
```

## Built With

 - [Expo](https://expo.io) - Mobile development framework
 - [Yarn](https://yarnpkg.com/) - Dependency management
 - [MobX](https://mobx.js.org) - State management
 - [Styled Components](https://styled-components.com/) - Component styling
 - [Axios](https://github.com/axios/axios) - Network requests

### MobX

The app uses MobX as the state manager. 
The root store context is passed down from the top most component `src/Main.tsx` which allows new screens and 
components to access the store through the `useStoreContext()` function.

## Deployments


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[Apache-2.0](https://choosealicense.com/licenses/apache-2.0/)
