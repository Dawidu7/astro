import { Button, Form, Group, Input, Select } from "~/components"
import db from "~/db"

async function action(formData: any) {
  "use server"

  console.log(formData)
}

export default function Home() {
  return (
    <Form action={action} className="w-fit space-y-8">
      <Input label="Name" name="name" />
      <Input label="Age" name="age" type="number" />
      <Input label="Bio" name="bio" type="textarea" />
      <Input
        label="DateOfBirth"
        name="dateOfBirth"
        type="date"
        description="When were you born?"
      />
      <Group separator="x">
        <Input
          label="Resolution X"
          name="resolutionX"
          type="number"
          step={0.1}
          minValue={0}
        />
        <Input
          label="Resolution Y"
          name="resolutionY"
          type="number"
          step={0.1}
          minValue={0}
        />
      </Group>
      <Select label="Image" items={db.query.images.findMany()} name="image" />
      <Select
        label="Animal"
        items={["Cat", "Dog", "Horse"]}
        name="animal"
        search
      />
      <Button type="submit">Click me!</Button>
    </Form>
  )
}
