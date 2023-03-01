# Instructions
​
A write-up about your project. Please include what question you chose to explore, how you approached deciding on the data model, and how you approached the interface to interact with that data.
​
# Discussion
​
I chose to create an app called "Burger: 100" for exploring and eliminating top-rated burger joints on the "quest to find the perfect burger" as a pun on the Netflix shows Physical: 100.
​
Users can tailor a Search that returns up to 100 qualifying burger joints. Searches are persisted between sessions and can be modified by eliminating competitor burger joints. They can also be reset/refreshed with a replacement Search generated from entirely new data from Yelp. This effectively starts the game over at zero, and burger joints that were previously eliminated can compete again.
​
### Data Model
​
I went with a single table, Search, with four columns: location, price, total, and burger joints. Data models should be iterated on just like the code, and this model is sufficient for the features so far. Here is an example of how it could grow in the future:
​
- Split BurgerJoints off to a separate table (has-and-belongs-to-many Searches). This would reduce the overall data growth and allow for features like comparing a single burger joint's performance across competitions. A burger joint with ID 123 would be a single entry in the BurgerJoint table instead of appearing in the JSON of many Searches' burgerJoints. It's easy to imagine features that would prompt this change, such as creating in-app landing pages for each burger joint.
​
### Back-end Architecture
​
I organized the code according to familiar patterns, such as model-view-controller, and separated concerns into folders and files. At my current job, I have been part of some significant back-end rewrites and feature expansions, including object-oriented systems and functional data transformation pipelines.
​
I separated the calls to the Yelp API into a separate file. In a large system, it's easy to see this being split off to a reusable library like an npm package, which I have done in the past in many projects.
​
I noted a few places for potential expansion; for example, using Joi to validate request parameters.
​
I used an ORM (mongoose) because job security comes from producing exciting new features, not endless bugs in database access calls. :-) That said, I had worked in systems that did not use ORMs and written custom patterns with more efficient access calls than those available in a standard ORM.
​
Finally, I used the GraphQL API to hit Yelp since I know you are interested in that technology, and it's so easy to work with.
​
### Front-end Architecture
​
I used Bootstrap components since they add CSS without adding behavior. (I also threw some subtle animation on the logo to show I'm comfortably hand-rolling anything in CSS.) The large systems I have worked in all had core component libraries, and in my current role, I have contributed extensively to the core component libraries.
​
I split the API calls into a separate files since these usually end up abstracted away in large front-end systems.
​
I named and split out separate React components wherever possible so the HTML display could be read at different levels of abstraction.
​
### Readability
​
I used named arguments wherever possible in my function signatures, as this forces callers and functions to use the same names everywhere. I wrote dry code with descriptive names and avoided using anonymous functions.
​
I also wrote code within each function at the same level of abstraction. Whatever code you read is at the same high (or low) level as the code immediately surrounding it. This allows you to read the code from a summary or granular perspective to the degree you want to without being forced to wade through details to grasp the big picture.
​
### Efficiency
​
I avoided N+1 queries but did not bother creating custom indexes or other code specifically designed to counter performance problems not yet known to exist.
​
One area in which the efficiency of the app could be improved would be executing the Yelp queries in parallel rather than sequentially. I left this "performance bug" in the code for compare/contrast purposes and commented on it.
​
### Modular design
​
I separated code by function, module, file, and folder. This is because I genuinely believe a system is most extensible when each module exposes itself on a "need-to-know basis" and has a singular, unique purpose.
​
### Tests
​
I wrote a few definitive tests but only extensively tested this system as I would with the code I wrote in real life. In my career, I've written thousands of tests in jest, jasmine, mocha, and other frameworks.
​
(I figure a couple of tests are enough to illustrate skill in this area. If you want more, ask, and I'm happy to build a test suite with unit, integration, behavior, and API-level tests. When I interview with live coding exercises, I solve them TDD and usually write my custom runner as my first few lines of code.)