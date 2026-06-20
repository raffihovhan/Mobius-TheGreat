def count_to_ten():
    for i in range(1, 11):
        print(i)

def multiply_1_to_5_by_4():
    for i in range(1, 6):
        print(i * 4)

def print_total_sum():
    total = sum(range(1, 11)) + sum(i * 4 for i in range(1, 6))
    print("Total sum:", total)

print("Hello World")

# Example usage:
count_to_ten()
multiply_1_to_5_by_4()
print_total_sum()
