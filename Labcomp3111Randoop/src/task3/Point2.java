package task3;

public class Point2 {

	private final int x;
	private final int y;
	private final String s;

	public Point2(final int x, final int y, final String name) {
		this.x = x;
		this.y = y;
		s = name;
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

	@Override
	public boolean equals(final Object obj) {
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		final Point2 other = (Point2) obj;
		if (x != other.x)
			return false;
		if (y != other.y)
			return false;
		if (s != other.s)
			return false;
		return true;
	}

}
