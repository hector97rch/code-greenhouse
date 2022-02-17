defmodule Banco.PalabraTest do
  use Banco.DataCase
  alias Banco
  alias Banco.Palabras

  describe "set word" do
    test "crear palabra successfully" do
      changeset = Palabras.crear_palabra_changeset(%{"palabra" => "color", "descripcion" => "sirve para colorear"})
      assert changeset.valid? == true
    end

    test "error crear palabra con numeros" do
      changeset = Palabras.crear_palabra_changeset(%{"palabra" => "color1", "descripcion" => "sirve para colorer"})
      assert changeset.valid? == false
    end
    test "error crear palabra con espacio" do
      changeset = Palabras.crear_palabra_changeset(%{"palabra" => "color rojo", "descripcion" => "sirve para colorer"})
      assert changeset.valid? == false
    end
    test "error crear palabra vacia" do
      changeset = Palabras.crear_palabra_changeset(%{"palabra" => "", "descripcion" => ""})
      assert changeset.valid? == false
    end
  end

  describe "get words" do
    setup do
      palabra = %Banco.Palabras{}
      palabra_changeset = Banco.Palabras.crear_palabra_changeset(palabra, %{palabra: "lapiz", descripcion: "sirve para escribir palabras"})
      guardar_palabra = Banco.Repo.insert(palabra_changeset)
      {:ok, palabra: guardar_palabra}
  end
    test "get words succesfuly" do
      pal = Palabras.buscar_palabras
      assert not is_nil(pal)
    end
  end

  describe "get word" do
    setup do
      palabra = %Banco.Palabras{}
      palabra_changeset = Banco.Palabras.crear_palabra_changeset(palabra, %{palabra: "crayola", descripcion: "sirve para escribir palabras"})
      guardar_palabra = Banco.Repo.insert(palabra_changeset)
      {:ok, palabra: guardar_palabra}
  end
    test "get word succesfuly", %{palabra: palabra}do
      pal = Palabras.buscar_palabra(%{id: palabra.id})
      assert not is_nil(pal)
    end
  end

  describe "delete word" do
    setup do
      palabra = %Banco.Palabras{}
      palabra_changeset = Banco.Palabras.crear_palabra_changeset(palabra, %{palabra: "goma", descripcion: "sirve para escribir palabras"})
      guardar_palabra = Banco.Repo.insert(palabra_changeset)
      {:ok, palabra: guardar_palabra}
  end
    test "delete succesfuly", %{palabra: palabra}do
      {:ok, pal} = Palabras.eliminar_palabra_changeset(%{id: palabra.id})
      assert not is_nil(pal)
    end
  end

  describe "update word" do
    setup do
      palabra = %Banco.Palabras{}
      palabra_changeset = Banco.Palabras.crear_palabra_changeset(palabra, %{palabra: "goma", descripcion: "sirve para escribir palabras"})
      guardar_palabra = Banco.Repo.insert(palabra_changeset)
      {:ok, palabra: guardar_palabra}
  end
    test "update succesfuly", %{palabra: palabra}do
      {:ok, pal} = Palabras.ctualizar_palabra_changeset(%{id: palabra.id, palabra: "perro", descripcion: "mejor amigo del hombre"})
      assert not is_nil(pal)
    end
  end

end
