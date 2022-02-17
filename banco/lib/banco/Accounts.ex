defmodule Banco.Accounts do
  import Ecto.Query
  import Ecto.Schema
  import Ecto.Query
  alias Banco.Palabras

  def crear_palabra(attrs \\ %{}) do
    attrs
    |> Palabras.crear_palabra_changeset()
    |> Banco.Repo.insert()
  end

  def actualizar_palabra(attrs \\ %{}) do
    attrs
    |> Palabras.actualizar_palabra_changeset()
    |> Banco.Repo.update()
  end

  def eliminar_palabra(attrs \\ %{}) do
    attrs
    |> Palabras.eliminar_palabra_changeset()
    |> Banco.Repo.delete()
  end

end
