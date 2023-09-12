"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Form,
  Group,
  Input,
  Select,
  Separator,
} from "~/components"
import type { SelectCatalog } from "~/db/schema"
import { saveFile } from "~/lib/utils"

export default function Client({ catalogs }: { catalogs: SelectCatalog[] }) {
  const [DSs, setDSs] = useState<{ id: 3 | 4; name: string }[]>([])

  async function addDS({
    catalog,
    numbers,
  }: {
    catalog: { name: string; value?: string }
    numbers: string
  }) {
    numbers.split(" ").forEach(value => {
      if (isInvalid(value)) return

      if (!value.includes("-")) {
        setDSs(prev => [
          ...prev,
          {
            id: "value" in catalog ? 4 : 3,
            name: `${"value" in catalog ? `${catalog.value} ` : ""}${value}`,
          },
        ])

        return
      }

      const range = value.split("-").map(Number)

      for (let i = range[0]; i <= range[1]; i++) {
        setDSs(prev => [
          ...prev,
          {
            id: "value" in catalog ? 4 : 3,
            name: `${"value" in catalog ? `${catalog.value} ` : ""}${i}`,
          },
        ])
      }
    })
  }

  function save() {
    if (DSs.length === 0) return

    saveFile(
      [
        "SkySafariObservingListVersion=3.0\n",
        "SortedBy=Default Order",
        ...DSs.map(({ id, name }) =>
          [
            "\n",
            "SkyObject=BeginObject",
            `ObjectID=${id}, -1, -1`,
            `CatalogNumber=${name}`,
            "EndObject=SkyObject",
          ].join("\n"),
        ),
      ],
      "generator",
      "skylist",
    )
  }

  return (
    <div className="flex w-full justify-evenly max-[560px]:flex-col">
      <Box className="h-min pt-6 min-[560px]:w-fit">
        <Form action={addDS}>
          <Select
            label="Catalog"
            items={[{ name: "None" }, ...catalogs]}
            name="catalog"
          />
          <Input label="Numbers" name="numbers" description="e.g. 1 3 5-7" />
          <Button type="submit">Add DS</Button>
        </Form>
      </Box>
      <Box className="h-min p-0 min-[560px]:w-fit">
        <Group className="p-4 text-base">
          <Button onPress={save}>Save</Button>
          <Button onPress={() => setDSs([])}>Delete All</Button>
        </Group>
        <Separator />
        <ul className="space-y-4 p-4">
          <li className="flex flex-col">
            <span>SkySafariObservingListVersion=3.0</span>
            <span>SortedBy=Default Order</span>
          </li>
          {DSs.map(({ id, name }, i) => (
            <li key={i}>
              <Button
                className="flex w-full flex-col rounded data-[hovered]:bg-zinc-700"
                onPress={() => setDSs(prev => prev.filter((_, j) => i !== j))}
                plain
              >
                <span>SkyObject=BeginObject</span>
                <span>ObjectID={id}, -1, -1</span>
                <span>CatalogNumber={name}</span>
                <span>EndObject=SkyObject</span>
              </Button>
            </li>
          ))}
        </ul>
      </Box>
    </div>
  )
}

function isInvalid(input: string) {
  if (!input.includes("-")) {
    return !input.match(/^[0-9]+$/)
  }

  const split = input.split("-")

  if (split.some(value => !value.match(/^[0-9]+$/))) return true
  if (Number(split[0]) >= Number(split[1])) return true

  return false
}
