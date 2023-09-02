import { Button, Input } from "~/components"

async function action(formData: FormData) {
  "use server"

  console.log(formData)
}

export default function Home() {
  return (
    <form action={action} className="w-fit space-y-8">
      <Input
        label="Name"
        name="name"
        description="Full name."
        // error="Must be a string."
      />
      <Input
        label="Age"
        name="age"
        type="number"
        description="Don't be underage."
        // error="Must be >= 18."
      />
      <Input
        label="Bio"
        name="bio"
        type="textarea"
        description="Tell us more about yourself."
        // error="Must be a string."
      />
      <Input
        label="DateOfBirth"
        name="dateOfBirth"
        type="date"
        description="When were you born?"
        // error="Ain't a date, lad."
      />
      <Button type="submit">Click me!</Button>
    </form>
  )
}
