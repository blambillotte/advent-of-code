defmodule Day1 do
  def run() do
    input =
      File.read!("./inputs/day_1.txt")
      |> String.split("\n")
      |> IO.inspect()

    result =
      input
      |> Enum.()
  end
end
