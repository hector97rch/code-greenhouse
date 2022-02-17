defmodule BancoWeb.PalabraController do
  use BancoWeb, :controller
  alias Banco.Accounts
  use PhoenixSwagger
  action_fallback BancoWeb.PalabraErrorController



  # coveralls-ignore-start
  def swagger_definitions do
    %{
      User: swagger_schema do
        title "palabras"
        description "database for the banco palabras application"
        properties do
          id :string, "Unique identifier", required: true
          palabra :string, "word", required: true
          descripcion :string, "word description ", required: true

        end
        example %{
          id: "1",
          palabra: "lapiz",
          descripcion: "sirve para escribir"
        }
      end,
      Paabra: swagger_schema do
        title "palabras"
        description "A collection of words"
        type :array
      items Schema.ref(:User)
      end
    }
  end
# coveralls-ignore-stop


  def get_words(conn, _params) do
    palabras = Banco.Palabras.buscar_palabras()
    case palabras != [] do
        true ->
          conn
            |>put_status(200)
            |>render("palabras.json", %{palabras: palabras})
        false ->
          {:error, "no hay palabras"}
    end
  end

  swagger_path :get_words do
    PhoenixSwagger.Path.get "/banco/palabras"
    summary "show all words"
    description "list all woords on json"
    produces("application/json")
    response 200, "lista de palabras"
    response 400, "no hay palabras"
  end

  def get_word(conn, %{"id" => id}) do
      case Banco.Palabras.buscar_palabra(id) do
        nil->
          {:error, "Palabra no encontrada!"}
        palabra->
          conn
            |> put_status(200)
            |> render("palabra.json", %{palabra: palabra})
      end
  end

  swagger_path :get_word do
    PhoenixSwagger.Path.get "/banco/palabras/id"
    summary "show one word "
    description "list one word on json"
    produces("application/json")
    response 200, "palabra"
    response 400, "palabra no encontrada"
  end

  def set_word(conn, attrs) do
    case Banco.Accounts.crear_palabra(attrs) do
    {:ok, palabra} ->
      conn
        |> put_status(201)
        |> render("palabra.json", %{palabra: palabra})
      {:error, changeset}->
        {:error, "No se pudo crear la palabra"}
    end
  end

     # coveralls-ignore-start
     swagger_path :set_word do
      post "/banco/palabras"
      summary "create word"
      description "add word in the database"
      produces "application/json"
      deprecated(false)
      operation_id "set_word"
      parameters do
        id :string, "Unique identifier", required: true
        palabra :string, "word", required: true
        descripcion :string, "description for words", required: true
      end
      response 201, "palabra.json", Schema.ref(:Palabra)
      response 400, ":error"
    end
  # coveralls-ignore-stop

  def delete_word(conn,attrs) do
    delete = Banco.Accounts.eliminar_palabra(attrs)
    case delete do
      {:ok, palabra}->
        conn
            |>put_status(200)
            |>text("Palabra Eliminada")
      {:error, changeset}->
        {:error, "No se pudo eliminar"}
    end
  end

    # coveralls-ignore-start
    swagger_path :delete_word do
      PhoenixSwagger.Path.delete "/banco/palabras/:id"
      summary "Delete word"
      description "Delete word by ID"
      parameter :id, :path, :integer, "word ID", required: true, example: 3
      response 200, "Eliminaa"
      response 400, "no se pudo eliminar"
    end
    # coveralls-ignore-stop


  def update_word(conn, attrs) do
    update = Banco.Accounts.actualizar_palabra(attrs)
    case update do
      {:ok, palabra}->
        conn
            |>put_status(205)
            |>text("Actualizada")
      {:error, changeset }->
        {:error, "No se pudo actualizar la palabra"}
    end
  end
  # coveralls-ignore-start
  swagger_path :update_word do
    put("/manager/palabras/{id}")
    summary "Update word"
    description "Update word by ID"
    produces("aplication/json")
    deprecated(false)
    parameters do
      id :string, "Unique identifier", required: true
      palabra :string, "word", required: true
      descripcion :string, "description for words", required: true
    end
    response 205, "Actualizada"
    response 400, "No se pudo actualizar"
  end
  # coveralls-ignore-stop
end
