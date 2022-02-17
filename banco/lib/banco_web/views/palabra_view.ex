defmodule BancoWeb.PalabraView do
  use BancoWeb, :view

  def render("palabras.json", %{palabras: palabras}) do
    render_many(palabras, BancoWeb.PalabraView, "palabra.json")
  end

  def render("palabra.json", %{palabra: palabra}) do
      %{
          id: palabra.id,
          palabra: palabra.palabra,
          descripcion: palabra.descripcion
      }
  end
end
