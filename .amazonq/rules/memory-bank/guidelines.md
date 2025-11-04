# Development Guidelines - weddlv

## Code Quality Standards

### TypeScript Standards
- **Strict Mode**: TypeScript strict mode enabled across all files
- **Type Safety**: Explicit type definitions for all function parameters and return values
- **Interface Usage**: Prefer interfaces for object shapes, types for unions/primitives
- **Generic Types**: Use generics for reusable components and utilities
- **Type Imports**: Use `type` keyword for type-only imports: `import type { Metadata } from "next"`

### File Organization
- **Client Directives**: Use `'use client'` directive at top of client components
- **Import Order**: External packages → Internal utilities → Components → Types
- **Path Aliases**: Use `@/` prefix for all internal imports
- **File Extensions**: Use `.tsx` for React components, `.ts` for utilities

### Naming Conventions
- **Components**: PascalCase with descriptive names (e.g., `InvitationEditor`, `StepBasicInfo`)
- **Functions**: camelCase with action verbs (e.g., `handleNext`, `generateSlug`)
- **Constants**: UPPER_SNAKE_CASE for arrays/objects (e.g., `STEPS`)
- **Variables**: camelCase with descriptive names
- **Files**: kebab-case for component files, camelCase for utilities

## Component Architecture Patterns

### React Hook Form Integration
```typescript
const form = useForm<FormType>({
  resolver: zodResolver(validationSchema),
  defaultValues: initialData || defaultValues,
})
```
- Always use Zod resolver for validation
- Provide explicit default values
- Use TypeScript generics for form types

### State Management Pattern
```typescript
const [currentStep, setCurrentStep] = useState(0)
const [isSubmitting, setIsSubmitting] = useState(false)
```
- Use descriptive state variable names
- Initialize with appropriate default values
- Prefer multiple useState calls over single complex state

### Event Handler Pattern
```typescript
const handleNext = useCallback(async () => {
  // validation logic
  if (isStepValid) {
    // action logic
  }
}, [dependencies])
```
- Use `useCallback` for event handlers with dependencies
- Include async/await for server actions
- Implement validation before actions

### Conditional Rendering Pattern
```typescript
const renderStepContent = () => {
  switch (currentStep) {
    case 0: return <StepBasicInfo />
    case 1: return <StepCoupleInfo />
    default: return null
  }
}
```
- Use switch statements for multi-condition rendering
- Always include default case returning null
- Extract complex conditional logic to separate functions

## UI Component Standards

### Shadcn/ui Component Usage
```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
```
- Import specific components, not entire modules
- Use compound components for complex UI elements
- Maintain consistent import patterns

### Component Props Pattern
```typescript
interface ComponentProps {
  mode: 'create' | 'edit'
  initialData?: DataType
  onAction?: () => void
}
```
- Use union types for mode/variant props
- Make optional props explicitly optional with `?`
- Include callback props for parent communication

### Styling Approach
```typescript
className={cn(
  "base-classes",
  conditionalClass && "conditional-classes",
  className
)}
```
- Use `cn()` utility for conditional classes
- Accept `className` prop for style overrides
- Apply base styles first, then conditionals

## Data Management Patterns

### Server Actions Pattern
```typescript
export async function actionName(data: ValidatedType) {
  try {
    const validatedData = schema.safeParse(data)
    if (!validatedData.success) {
      return { success: false, error: 'Validation failed' }
    }
    
    const supabase = createClient()
    const { data: result, error } = await supabase.operation()
    
    if (error) {
      return { success: false, error: 'Operation failed' }
    }
    
    revalidatePath('/relevant-path')
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: 'Unexpected error' }
  }
}
```
- Always validate input data with Zod
- Use consistent return format: `{ success: boolean, data?: any, error?: string }`
- Include proper error handling and logging
- Revalidate relevant paths after mutations

### Database Type Safety
```typescript
import type { Database } from '@/types/database'

type TableRow = Database['public']['Tables']['table_name']['Row']
type TableInsert = Database['public']['Tables']['table_name']['Insert']
```
- Use generated database types for all operations
- Separate Row, Insert, and Update types
- Maintain type safety across database operations

### Authentication Pattern
```typescript
const supabase = createClient()
const { data: { user }, error: authError } = await supabase.auth.getUser()

if (authError || !user) {
  return { success: false, error: 'Unauthorized' }
}
```
- Always check authentication before protected operations
- Use consistent error handling for auth failures
- Separate auth errors from operation errors

## Form Validation Standards

### Zod Schema Pattern
```typescript
export const schemaName = z.object({
  field: z.string().min(1, 'Field is required'),
  optionalField: z.string().optional(),
  nestedObject: z.object({
    subField: z.string(),
  }),
})

export type SchemaType = z.infer<typeof schemaName>
```
- Use descriptive schema names
- Include validation messages
- Export inferred types for TypeScript usage
- Group related validations in nested objects

### Form Trigger Pattern
```typescript
const isValid = await form.trigger(['field1', 'field2'], { shouldFocus: true })
```
- Use `trigger` for step-by-step validation
- Include `shouldFocus` for better UX
- Validate specific fields rather than entire form

## Error Handling Standards

### Try-Catch Pattern
```typescript
try {
  // operation
} catch (error) {
  console.error('Context-specific error:', error)
  return { success: false, error: 'User-friendly message' }
}
```
- Always include contextual error logging
- Return user-friendly error messages
- Maintain consistent error response format

### Loading States
```typescript
const [isSubmitting, setIsSubmitting] = useState(false)

const handleAction = async () => {
  setIsSubmitting(true)
  try {
    // async operation
  } finally {
    setIsSubmitting(false)
  }
}
```
- Use loading states for async operations
- Always reset loading state in finally block
- Disable interactive elements during loading

## Performance Optimization

### Component Optimization
- Use `useCallback` for event handlers with dependencies
- Implement proper dependency arrays
- Extract complex calculations to useMemo when needed
- Use React.memo for expensive pure components

### Import Optimization
- Use specific imports instead of barrel exports
- Import only needed utilities and components
- Prefer dynamic imports for heavy components

### Rendering Optimization
- Extract render functions for complex conditional logic
- Use keys for dynamic lists
- Implement proper loading states and skeletons

## Security Best Practices

### Input Validation
- Validate all user inputs with Zod schemas
- Sanitize data before database operations
- Use parameterized queries via Supabase client

### Authentication Security
- Check user authentication for all protected operations
- Implement proper Row Level Security (RLS) policies
- Use server-side authentication checks

### Data Access Control
- Verify user ownership before data operations
- Implement proper authorization checks
- Use RLS policies as primary security layer