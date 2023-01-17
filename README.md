# Overview

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses the [Punk API](https://punkapi.com/documentation/v2).

## Comments

- The filtering, filters the whole beer dataset (sending new requests with search parameters).

- The search, searches through fetched data. It's possible to search the entire data set, but to my knowledge only certain parts like beer_name (and not e.g. beer_description), and I'm not sure how to search within multiple fields at once (match against both e.g. beer_name and beer_yeast. I tried: https://api.punkapi.com/v2/beers?beer_name=Mixtape8|yeast=pilsen but it's only matching against the first, beer_name.)

- The API does not contain meta data such as "total number of pages" or "total number of beers", therefore it's difficult to know the number of pages to include. To have some kind of pagination I decided to fetch (at most) 80 items and divide them in to pages of 25 items. I know this isn't the optimal solution.

- Similarly, there's no information about the beer with the highest or lowest abv (so the max set for the filter range "Alcohol by volume" is based on the current existing highest abv in a beer which is 67.5%). It would be possible to fetch the entire list of beers, but the load time is likely to be high, and it would defeat the purpose of using the url requests like ?abv_gt="30" (?).

- Since I used a table, which is quite condensed, I didn't see the purpose of including images in the table view.

## Improvements

- More test cases could be added - I added a few to show the ideas I have regarding unit testing.
- Add sorting for each column in the table
- BeerList.tsx can probably be improved in terms of methods, fetching etc., I'm not sure if I'm using the best strategies.
- Add more details to the item detail page
- Currently many requests are sent from the multiRangeSlider, and ideally the event would only fire after drag. OnChange on a range input element seems to normally trigger after release, but for some reason it's not for me. Another option for my current design (if the event handling isn't improved) would be to add a search button and fire the event on click.
- I can reuse components a bit more, e.g. the labels with class="text-uppercase text-success" are used in several places.
- Some elements can be enhanced (like making the search bar and pagination in dark mode and make the ABV progress bar on the detail page prettier)
- Randomize beers can probably be nicer, but I wasn't sure how to trigger a react hook (useBeers) on click.
- Add filters, e.g. type of beer (lager, ale, other), date first brewed

Note: This project was built with some lack of React experience, so it can probably be better structured and use React features more efficiently.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode and reloads when edits are made. \
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance, and makes it ready for deployment.\

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
