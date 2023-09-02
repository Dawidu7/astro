import { Button, Input } from "~/components"

export default function Home() {
  return (
    <div className="w-fit space-y-4">
      <Input label="Name" name="name" description="Full name" />
      <Input label="Age" name="age" type="number" />
      <Input label="Bio" name="bio" type="textarea" />
      <Button>Click me!</Button>
    </div>
  )
}
