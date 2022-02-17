defmodule BancoWeb.PalabraErrorController do
  use BancoWeb, :controller

  def call(conn, {:error, changeset = %Ecto.Changeset{}}) do
    conn
      |> put_status(400)
      |> json(%{errors: "Changeset Errors"})
  end

  def call(conn, {:error, error}) do
    conn
      |> put_status(400)
      |> json(%{error: error})
  end

end
