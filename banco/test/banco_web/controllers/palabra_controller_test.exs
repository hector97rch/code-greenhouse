defmodule BancoWeb.PalabraControllerTest do
  use BancoWeb.ConnCase
setup  do
  conn = build_conn()
    params = conn
      |> put_req_header("content-type", "application/json")
      |> post(Routes.palabra_path(conn, :set_word, %{palabra: "lapiz", descripcion: "escribesvdnfvkdh"}))
      |> json_response(201)
      {:ok, params: params}
  end
  #*---------------crear palabra -----------------
  test "set word succesfully" do
    conn = build_conn()
    response = conn
      |> put_req_header("content-type", "application/json")
      |>post(Routes.palabra_path(conn, :set_word, %{palabra: "lapiz", descripcion: "escribesvdnfvkdh"}))
      |> json_response(201)
    assert  %{
        "id" => _id,
        "palabra" => _palabra,
        "descripcion" => _descripcion
    } = response
  end

    test "set word unsuccesfully" do
    conn = build_conn()
    response = conn
      |> put_req_header("content-type", "application/json")
      |>post(Routes.palabra_path(conn, :set_word, %{descripcion: "dsv"}))
      |> json_response(400)
    assert  %{
      "error" => "No se pudo crear la palabra"
    } = response
  end
#-----------------mostrar palabra-------------------
  test "get palabra succesfully", %{params: params}do
    conn = build_conn()
    response = conn
      |>get(Routes.palabra_path(conn, :get_word, params["id"]))
      |>json_response(200)

    assert  %{
        "id" => _id,
        "palabra" => _palabra,
        "descripcion" => _descripcion
    } = response
  end
#-----------------mostrar palabras----------------------
  test "get palabra unsuccesfully" do
    conn = build_conn()
    response = conn
      |>get(Routes.palabra_path(conn, :get_word,0))
      |>json_response(400)

    assert  %{
      "error" => "Palabra no encontrada!"
    } = response
  end
  test "get palabras succesfully" do
    conn = build_conn()
    response = conn
      |>get(Routes.palabra_path(conn, :get_words))
      |>json_response(200)

    assert  [%{
        "id" => _id,
        "palabra" => _palabra,
        "descripcion" => _descripcion
    }] = response
  end
#----------------------actualizar palabras----------------------
  test "update succesfully", %{params: params} do
    conn = build_conn()
    response = conn
    |>put(Routes.palabra_path(conn, :update_word, params["id"]))
    |>response(205)
    assert "Actualizada" == response
  end
  test "update unsuccesfully"  do
    conn = build_conn()
    response = conn
    |>put(Routes.palabra_path(conn, :update_word))
    |>json_response(400)
    assert  %{
      "error" => "No se pudo actualizar la palabra"
  } = response
  end
#---------------------eliminar palabras-------------------------
test "eliminar succesfully", %{params: params} do
  conn = build_conn()
    response = conn
    |>delete(Routes.palabra_path(conn, :delete_word, params["id"]))
    |>response(200)
    assert "Palabra Eliminada" == response
end




  def crear_palabra do
  ~s({
    "palabra":{
      "palabra": "lapiz",
      "descripcion": "sirve para escribir"}
  })
  end

end
