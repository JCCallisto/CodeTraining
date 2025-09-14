#!/usr/bin/env python3

class GradeAnalyzer:
    def __init__(self, students):
        """
        students: list of dicts, each with keys 'name', 'grades' (list of numbers), 'attendance' (percentage)
        """
        self.students = students

    def get_class_average(self):
        total = 0
        count = 0
        for student in self.students:
            grades = student.get('grades', [])
            total += sum(grades)
            count += len(grades)
        return total / count if count > 0 else 0

    def get_top_student(self):
        top = None
        top_avg = -1
        for student in self.students:
            grades = student.get('grades', [])
            if grades:
                avg = sum(grades) / len(grades)
                if avg > top_avg:
                    top_avg = avg
                    top = student.get('name')
        return top

    def get_failing_students(self, passing_grade=60):
        failing = []
        for student in self.students:
            grades = student.get('grades', [])
            if grades and (sum(grades) / len(grades)) < passing_grade:
                failing.append(student.get('name'))
        return failing

    def get_honors_students(self, honors_grade=90):
        honors = []
        for student in self.students:
            grades = student.get('grades', [])
            if grades and (sum(grades) / len(grades)) >= honors_grade:
                honors.append(student.get('name'))
        return honors
    
    def generate_report(self):
        report = []
        report.append(f"Class average: {self.get_class_average():.2f}")
        report.append(f"Top student: {self.get_top_student()}")
        report.append(f"Failing students: {', '.join(self.get_failing_students()) or 'None'}")
        report.append(f"Honors students: {', '.join(self.get_honors_students()) or 'None'}")
        report.append("\nDetailed Class performance:\n")
        for student in self.students:
            name = student.get('name', 'Unknown')
            grades = student.get('grades', [])
            attendance = student.get('attendance', 0)
            avg_grade = sum(grades) / len(grades) if grades else 0
            report.append(f"{name}: Average Grade: {avg_grade:.2f}, Attendance: {attendance:.1f}%")
        return "\n".join(report)

if __name__ == "__main__":
    students = [
        {'name': 'Alice', 'grades': [85, 92, 78, 96], 'attendance': 98.5},
        {'name': 'Bob', 'grades': [72, 68, 75], 'attendance': 87.2},
        {'name': 'Charlie', 'grades': [95, 88, 92, 94], 'attendance': 96.1},
        {'name': 'Diana', 'grades': [58, 62, 55], 'attendance': 92.0},
        {'name': 'Eve', 'grades': [91, 89, 93, 95], 'attendance': 97.8},
        {'name': 'Frank', 'grades': [45, 50, 55], 'attendance': 85.0},
        {'name': 'Grace', 'grades': [100, 98, 99], 'attendance': 100.0}
    ]
    
    analyzer = GradeAnalyzer(students)
    
    print("Class Analysis:")
    print(f"Class Average: {analyzer.get_class_average():.2f}")
    print(f"Top Student: {analyzer.get_top_student()}")
    print(f"Failing Students: {analyzer.get_failing_students()}")
    print(f"Honors Students: {analyzer.get_honors_students()}")
    print("\nOverall Class Performance:\n")
    print(analyzer.generate_report())
