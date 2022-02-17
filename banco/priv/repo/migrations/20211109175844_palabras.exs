defmodule Banco.Repo.Migrations.Palabras do
  use Ecto.Migration

  def change do
    create table(:palabras) do
      add :palabra, :string
      add :descripcion, :string
      timestamps()
    end
  end
end
