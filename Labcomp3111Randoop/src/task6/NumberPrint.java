package task6;

/**
 * 
 * 
 * Example printer
 * 
 * @author valerio
 * 
 */
public class NumberPrint {
	public NumberPrint() {

	}

	public String getSequence(final int n) {
		String s = "";
		int i = 0;
		while (i <= n) {
			s = s + "-" + i;
			i++;
		}
		return s;

	}

}
