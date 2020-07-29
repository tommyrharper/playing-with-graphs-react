# Playing with Graphs in React

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