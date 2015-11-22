
public class Student extends Compartment {
	
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
	
	public String getCompartmentName()
	{
		return this.compartmentName;
	}
	//End
	
	//Inline method
	int getDiploma()
	{
		return (moreThanFourStudyYears()) ? 2 : 1;
	}
	boolean moreThanFourStudyYears()
	{
		return studentYear > 4;
	}
	//End
	
	//Parameterize method
	boolean firstYearPassed()
	{
		return studentYear > 1;
	}
	boolean secondYearPassed()
	{
		return studentYear > 2;
	}
	//End
	
	//Move method
	int available()
	{
		return (numberOfStudents < 100) ? 2:1;
	}
	//End
}
