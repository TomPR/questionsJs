package task5;

/**
 * 
 * 
 * Example calculator
 * 
 * @author valerio
 * 
 */
public class Calculator {
	public String output = "";
	private Character op = 'q';
	private int num, numTemp;

	public String getCurrentString() {

		return output;
	}

	public void reset() {
		output = "";
		op = 'q';
		num = 0;
		numTemp = 0;
	}

	public void insert(final int j) {
		// append the value
		output = output + Integer.toString(j);
		// get the current integer value
		num = Integer.valueOf(output).intValue();
	}

	public void perform(final Character op) {
		this.op = op;
		numTemp = Integer.valueOf(output).intValue();
		output = "";
	}

	public String calculate() {
		if (op == '+')
			num = plus(numTemp, num);
		else if (op == '-')
			num = minus(numTemp, num);
		else if (op == '/')
			num = div(numTemp, num);
		else if (op == '*')
			num = mult(numTemp, num);

		output = num + "";
		return output;

	}

	public int plus(final int numtemp, final int num) {

		return numtemp + num;
	}

	public int minus(final int numtemp, final int num) {

		return numtemp - num;
	}

	public int div(final int numtemp, final int num) {

		return numtemp * num;
	}

	public int mult(final int numtemp, final int num) {

		return numtemp * num;
	}
}
