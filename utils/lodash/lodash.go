package lodash

func Reduce[T any, V any](original []T, iteratee func(item T, idx int, result []V) []V) []V {
	var unique []V

	for index, o := range original {
		if value := iteratee(o, index, unique); value != nil {
			unique = append(unique, value...)
		}
	}

	return unique
}
