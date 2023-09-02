import { Text, Group } from "react-aria-components"

export default function Info({
  description,
  error,
}: {
  description: React.ReactNode | undefined
  error: React.ReactNode | undefined
}) {
  return (
    (error || description) && (
      <Group className="flex flex-col">
        {error && (
          <Text className="text-sm text-red-600" slot="errorMessage">
            {error}
          </Text>
        )}
        {description && (
          <Text className="text-sm text-zinc-400" slot="description">
            {description}
          </Text>
        )}
      </Group>
    )
  )
}
