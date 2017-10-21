# demo-color-backend

## Local Build

```
s2i build . centos/nodejs-6-centos7 color-backend --copy
```

## Deployment

We need 2 sets of resources (DC, SVC, Route) to be able to perform Blue/Green deployment

First we deploy `blue`

```
oc process -f template.app.yaml COLOR=blue | oc apply -f -
```

Next `green`

```
oc process -f template.app.yaml COLOR=green | oc apply -f -
```

These will also deploy a *master route* which will allow us switch between deployments

Last what we need to deploy is our pipeline (+actual image build config and image stream)

```
oc process -f template.pipeline.yaml | oc apply -f -
```

## Build

Go to `Builds > Pipelines` in your OpenShift console and hit **Start Pipeline**

Once the build and tagging is done, you should see an URL to your new blue or green deployment. The API endpoint is `$URL/api/v1/color`

Clicking on **Proceed** will promote the build to the master route