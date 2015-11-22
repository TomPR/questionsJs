
public class Student_Refactored extends Compartment_Refactored {
	
	private String studentName = null;
	private Integer studentID = null;
	private String compartmentName = null;
	private Integer studentYear = null;
	private Integer numberOfStudents = null;

	
	//Pull up method
	public Student (String studentName, Integer studentID, String compartmentName)
	{
		super(studentName, studentID, compartmentName);
	}
	
	//End
	
	//Inline method
	int getDiploma()
	{
		return (studentYear > 4) ? 2 : 1;
	}
	//End
	
	//Parameterize method
	boolean passed(yearToPass)
	{
		return studentYear > yearToPass;
	}
	//End
	
	//Move method

	//End
}
