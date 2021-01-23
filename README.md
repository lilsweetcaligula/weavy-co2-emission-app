# weavy-co2-emission-app

This application will calculate CO2 emission per process. Clone this repo then change into the repo's directory to play around.

## Pre-requisites:

I am assuming you have Node.js 10 or higher installed. It should work for Node.js 8 but, alas, I haven't tested it.

## Installation:
Clone the repo, `cd` into the directory, and run `npm install`. Now you are all set!

## Basic usage

By default it works something like this:
```
$ node .

pid     cpu    electricity_usage_kw      co2_emission_lbs
1       0      0                         0
31912   3      0.0013499999999999999     0.0019574999999999996
32020   3.3    0.001485                  0.0021532499999999998
```

## Output format

The app currently supports the following output formats: `json` for JSON, `csv` for CSV and `term` for basic terminal listing,
similar to `ps`. By default the result is output in the basic terminal listing format. In order to specify the format you must
pass the `output` option with one of the supported formats specified above.

For example, for JSON:
```
$ node . --output=json
```

For CSV:
```
$ node . --output=csv
```

And for basic terminal listing, which is redundant since it is the default anyway:
```
$ node . --output=term
```

## Total CO2 emission

If you want the total CO2 emission data, you may specify the `--total` option:
```
$ node . --total

cpu                  electricity_usage_kw   co2_emission_lbs
42.400000000000006   0.019079999999999996   0.02766599999999999
```

## Filtering out columns

If you want to select specific columns, you may want to use the `--columns` option and specify the comma-separated list
of names of columns that interest you. Currently, the names of the supported columns are: `pid`, `cpu`, `electricity_usage_kw`
and `co2_emission_lbs`.

For example:
```
$ node . --columns=pid,co2_emission_lbs

pid     co2_emission_lbs
15750   0.011484
8501    0.0025447499999999997
32020   0.0020879999999999996
```

## Sorting

You may sort the columns in both the ascending and descending order. For example, to sort by the PID in the ascending order:
```
$ node . --sort-by=pid
```

To sort by the CO2 emission in the descending order:
```
$ node  --sort-by=co2_emission_lbs:desc
```

To sort by multiple columns:
```
$ node  --sort-by=pid:asc,co2_emission_lbs:desc
```

If you omit the order (`asc` or `desc`), it is assumed the ascending order is specified:
```
$ node  --sort-by=pid,co2_emission_lbs:desc
```



