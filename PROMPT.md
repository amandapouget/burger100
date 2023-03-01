# UFSE Software Engineer Take Home Coding Exercise 2023

## Exercise
Create a Node.js app (backend+frontend) that utilizes one of the Yelp apis to answer an interesting question of your choosing, stores the relevant data in a database with the ability to refresh data as needed, and presents it in frontend interface that allows a few basic filters or queries on that data.

_An example submission may be one that:_
- Uses Yelp APIs to fetch the number of Boba shops in various Bay Area zip codes
- Stores the relevant data in a database (feel free to use a lightweight in-memory db such as sqlite or mongodb memory server)
- Has some way of refreshing the data in the database
- Presents a front-end interface that allows a user to look at the number of shops in different zip codes

### A few pointers
- When crafting your solution consider efficiency, readability, scalability, and modular design.
- Leveraging appropriate data structures can help optimize your solution.
- Unit tests and code comments will help your reviewer better understand your code and intent.
- Create a readme file with clear instructions on how to bootstrap and run your program.
- Feel free to utilize other data sources as you see fit, just include references to them if applicable.
- Please email  dzhou@netflix.com if you have any questions, or need clarification.

### Deliverables
When you have completed the exercise please email the following to the hiring manager (dzhou@netflix.com):
- A link to a public GitHub, Gitlab, or Bitbucket repository OR if you would like for your repository to be private, please let me know and I will provide two reviewers GitHub accounts to share your repository with.
- A write-up about your project. Please include what question you chose to explore, how you approached deciding on the data model, and how you approached the interface to interact with that data.

## Development

This project is provided as a skeleton for a starting point. You can use this or create something yourself.

### Setup
Run `yarn install` in both the top level directory and the client directory

To start the client and server run `yarn start` in the top level directory.