# Playing with Graphs in React

This project morphed into a full blown financial future visualisation application.

Try it out here at [http://howrichwillibe.surge.sh/](http://howrichwillibe.surge.sh/).

# Other info

Using [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2)

First I used:
```
npx create-react-app playing-with-graphs-react
```
Then I installed react-chartjs-2

```
npm install --save react-chartjs-2 chart.js
```

Then I created ```./src/components/Chart.js```.


## Deploying to surge

I did the following steps to deploy to surge:

```
npm run build
cd build
cp index.html 200.html
surge
```
