import { Button, Input } from "~/components"

export default function Home() {
  return (
    <div className="w-fit space-y-4">
      <Input label="Name" name="name" description="Full name." />
      <Input
        label="Age"
        name="age"
        type="number"
        description="You must be over 18."
      />
      <Input
        label="Bio"
        name="bio"
        type="textarea"
        description="Tell us more about yourself."
      />
      <Button>Click me!</Button>
    </div>
  )
}
