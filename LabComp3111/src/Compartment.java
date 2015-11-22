
public class Compartment {
	
	private String compartmentName = null;
	private Integer compartmentID = null;
	private Integer studentYear = null;
	private Integer numberOfStudents = null;
	
	public Compartment(String compartmentName, Integer compartmentID, String description)
	{
		this.compartmentName = compartmentName;
		this.compartmentID = compartmentID;
		this.x = description;
	}
	
	
	//Pull down method
	public Integer getStudentYear()
	{
		return this.studentYear;
	}
	//End

}
	
