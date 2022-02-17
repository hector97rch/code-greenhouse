# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :banco,
  ecto_repos: [Banco.Repo]

# Configures the endpoint
config :banco, BancoWeb.Endpoint,
  url: [host: "localhost"],
  render_errors: [view: BancoWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Banco.PubSub,
  live_view: [signing_salt: "Jic+T3x5"]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :banco, Banco.Mailer, adapter: Swoosh.Adapters.Local

# Swoosh API client is needed for adapters other than SMTP.
config :swoosh, :api_client, false


config :banco, :phoenix_swagger,
  swagger_files: %{
    "priv/static/swagger.json" => [
      router: BancoWeb.Router,     # phoenix routes will be converted to swagger paths
      endpoint: BancoWeb.Endpoint  # (optional) endpoint config used to set host, port and https schemes.
    ]
  }

# Configure esbuild (the version is required)
config :esbuild,
  version: "0.12.18",
  default: [
    args: ~w(js/app.js --bundle --target=es2016 --outdir=../priv/static/assets),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
