require("module-alias/register");

const run = async (port) => {
  const express = require("express");
  const app = express();
  const path = require('path');
  const dotenv = require("dotenv");

  const middlewares = require("./backend/REST/middlewares");
  const routes = require("./backend/REST/Routes");
  const ApolloServerConfig = require("./ApolloServerConfig");

  // add env keys
  dotenv.config({ path: ".env" });
  // replace local env keys
  const local_env = dotenv.config({ path: ".env.local" });
  process.env = { ...process.env, ...local_env.parsed };

  const cors = require("cors");

  app.use(
    cors({
      credentials: true,
      allowedHeaders: "*",
      origin: '*',
    })
  );

  const graphql_route = "/api/graphql";
  const not_graphql_route = /\/((?!api\/graphql).)*/;

  // >> REST <<
  // apply before middlewares
  app.use(not_graphql_route, middlewares.global_before_middlewares);

  const api_prefix = "/api";
  // routes
  routes.forEach((route) => {
    if (Array.isArray(route)) app.use(api_prefix + route[0], route[1]);
    else app.use(api_prefix, route);
  });

  // apply after middlewares
  app.use(not_graphql_route, middlewares.global_after_middleware);

  // >> Graphql <<
  const timeout = require('connect-timeout');
  app.use(graphql_route, timeout(process.env.GRAPHQL_TIMEOUT));
  // Graphql and Apollo Server
  await ApolloServerConfig.config(app, graphql_route);

  // >> Public folder <<
  app.use(express.static("public"));
  app.use(express.static(path.resolve(path.join(__dirname, '../web_engine/public'))));
  app.use(express.static(path.resolve(path.join(__dirname, '../public'))));


  // >> 404 <<
  const { trans } = require('@helpers/TranslateHelper');
  const ResponseHelper = require('./backend/REST/helpers/ResponseHelper');
  app.use('*', function (req, res) {
    if (!res.writableFinished)
      return ResponseHelper.api_res_err(res, trans('not_found', { attr: 'page' }), process.env.ERROR_CODE_NOTFOUND);
  });

  // serve project
  await app.listen(port);
  console.log(`🚀 Server ready at "http://localhost:${port}" \n and graphql api link "http://localhost:${port}/api/graphql"`);
};

// serve project
run(3001);
