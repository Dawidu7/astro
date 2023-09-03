import { Button, Input, Select } from "~/components"
import db from "~/db"

async function action(formData: FormData) {
  "use server"

  console.log(formData)
}

export default async function Home() {
  // console.log(images)

  return (
    <form action={action} className="w-fit space-y-8">
      <Input
        label="Name"
        name="name"
        description="Full name."
        // error="Must be a string."
        // defaultValue="John Smith"
      />
      <Input
        label="Age"
        name="age"
        type="number"
        description="Don't be underage."
        // error="Must be >= 18."
        // defaultValue={34}
      />
      <Input
        label="Bio"
        name="bio"
        type="textarea"
        description="Tell us more about yourself."
        // error="Must be a string."
        // defaultValue="This is John's Bio."
      />
      <Input
        label="DateOfBirth"
        name="dateOfBirth"
        type="date"
        description="When were you born?"
        // error="Ain't a date, lad."
        // defaultValue={images[0].date}
      />
      <Select
        label="Image"
        items={db.query.images.findMany()}
        description="Images. Nice."
      />
      <Select
        label="Animal"
        items={["Cat", "Dog", "Horse"]}
        description="You like animals, don't you?"
        search
        // error="Really?!"
        // defaultValue="Dog"
      />
      <Button type="submit">Click me!</Button>
    </form>
  )
}
