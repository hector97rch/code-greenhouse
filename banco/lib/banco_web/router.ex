defmodule BancoWeb.Router do
  use BancoWeb, :router

  pipeline :api do
    plug CORSPlug,
    send_preflight_response?: false,
    origin: [
      "http://40.69.134.65:3000"
    ]
    plug :accepts, ["json"]
  end

  scope "/banco", BancoWeb do
    pipe_through :api

    # coveralls-ignore-start
    options "/", OptionsController, :options

    options "/palabras", OptionsController, :options
    # coveralls-ignore-stop
    get "/palabras", PalabraController, :get_words
# coveralls-ignore-start
    options "/palabras/:id", OptionsController, :options
    # coveralls-ignore-start
    get "/palabras/:id", PalabraController, :get_word
# coveralls-ignore-start
    options "/palabras", OptionsController, :options
    # coveralls-ignore-start
    post "/palabras", PalabraController, :set_word
# coveralls-ignore-start
    options "/palabras/:id", OptionsController, :options
    # coveralls-ignore-stop
    delete "/palabras/:id", PalabraController, :delete_word

    options "/palabras/:id", OptionsController, :options
    put "/palabras/:id", PalabraController, :update_word
    put "/palabras", PalabraController, :update_word
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: BancoWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
