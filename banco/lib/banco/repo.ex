defmodule Banco.Repo do
  use Ecto.Repo,
    otp_app: :banco,
    adapter: Ecto.Adapters.Postgres
end
