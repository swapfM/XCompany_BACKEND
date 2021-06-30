from rest_framework import serializers
from employapp.models import Departments, Employees

class DepartmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ("DepartmentId",
                    "DepartmentName")


class EmployeeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ("EmployeeId",
                "EmployeeName",
                "Department",
                "DateOfJoining",
                "PhotoFileName")