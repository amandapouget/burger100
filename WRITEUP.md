 A write-up about your project. Please include what question you chose to explore, how you approached deciding on the data model, and how you approached the interface to interact with that data.

# Install instructions
## Database
### Install
```
brew tap mongodb/brew
brew install mongodb-community
```
### Run (from repo root directory)
```
brew services start mongodb-community
mongod --dbpath=./data
```
