defmodule Banco.Palabras do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

     schema "palabras" do
         field :palabra, :string
         field :descripcion, :string
         timestamps()
     end


     def crear_palabra_changeset(attrs) do
         %__MODULE__{}
             |> cast(attrs, [:palabra, :descripcion])
             |> validate_required([:palabra, :descripcion])
             |> validate_format(:palabra, ~r{^[a-zA-Z]+$})
     end

     def buscar_palabras() do
         query = from u in Banco.Palabras,
                 select: u
         Banco.Repo.all(query)
     end

     def buscar_palabra(id) do
         query = from u in Banco.Palabras,
                 where: u.id == ^id,
                 select: u
         Banco.Repo.one(query)
     end

     defp get_changeset(attrs) do
        %__MODULE__{}
        |> cast(attrs, [:id])
        |> validate_required([:id])
        |> get_palabra()
      end

    defp get_palabra(changeset) do
        case changeset.valid? do
          true ->
            case Banco.Repo.get(__MODULE__, get_field(changeset, :id)) do
              nil -> add_error(changeset, :id, "Palabra no encontrada")
              palabra -> palabra
            end
          false -> changeset
        end
      end

     def actualizar_palabra_changeset(attrs) do
        attrs
        |>get_changeset()
        |>cast(attrs,[:palabra, :descripcion])
        |>validate_required([:palabra, :descripcion])
       # |>Banco.Repo.update()
     end

     def eliminar_palabra_changeset(attrs) do
      attrs
      |> get_changeset()
     end
 end
