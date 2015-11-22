package task4;

import java.util.Date;

/**
 * Created by hunkim on 7/16/15.
 */
public class Question implements Comparable<Question> {

	/**
	 * Must be synced with firebase JSON structure Each must have getters
	 */
	private String key;
	private String wholeMsg;
	private String head;
	private String headLastChar;
	private String desc;
	private String linkedDesc;
	private boolean completed;
	private long timestamp;
	private String tags;
	private int echo;
	private int order;
	private boolean newQuestion;

	public String getDateString() {
		return dateString;
	}

	private String dateString;

	public String getTrustedDesc() {
		return trustedDesc;
	}

	private String trustedDesc;

	// Required default constructor for Firebase object mapping
	@SuppressWarnings("unused")
	private Question() {
	}

	/**
	 * Set question from a String message
	 * 
	 * @param message
	 *            string message
	 */
	public Question(final String message) {
		wholeMsg = message;
		echo = 0;
		head = getFirstSentence(message).trim();
		desc = "";
		if (head.length() < message.length()) {
			desc = message.substring(head.length());
		}

		// get the last char
		headLastChar = head.substring(head.length() - 1);

		timestamp = new Date().getTime();
		key = timestamp + wholeMsg;
	}

	/**
	 * Get first sentence from a message
	 * 
	 * @param message
	 * @return
	 */
	public static String getFirstSentence(final String message) {
		final String[] tokens = { ". ", "? ", "! " };

		int index = -1;

		for (final String token : tokens) {
			final int i = message.indexOf(token);
			if (i == -1) {
				continue;
			}

			if (index == -1) {
				index = i;
			} else {
				index = Math.min(i, index);
			}
		}

		if (index == -1) {
			return message;
		}

		return message.substring(0, index + 1);
	}

	/* -------------------- Getters ------------------- */
	public String getHead() {
		return head;
	}

	public String getDesc() {
		return desc;
	}

	public int getEcho() {
		return echo;
	}

	public String getWholeMsg() {
		return wholeMsg;
	}

	public String getHeadLastChar() {
		return headLastChar;
	}

	public String getLinkedDesc() {
		return linkedDesc;
	}

	public boolean isCompleted() {
		return completed;
	}

	public long getTimestamp() {
		return timestamp;
	}

	public String getTags() {
		return tags;
	}

	public int getOrder() {
		return order;
	}

	public boolean isNewQuestion() {
		return newQuestion;
	}

	public void updateNewQuestion() {
		newQuestion = timestamp > new Date().getTime() - 180000;
	}

	public String getKey() {
		return key;
	}

	public void setKey(final String key) {
		this.key = key;
	}

	/**
	 * New one/high echo goes bottom
	 * 
	 * @param other
	 *            other chat
	 * @return order
	 */
	@Override
	public int compareTo(final Question other) {
		// Push new on top
		other.updateNewQuestion(); // update NEW button
		updateNewQuestion();

		if (newQuestion != other.newQuestion) {
			return newQuestion ? 1 : -1; // this is the winner
		}

		if (echo == other.echo) {
			if (other.timestamp == timestamp) {
				return 0;
			}
			return other.timestamp > timestamp ? -1 : 1;
		}
		return echo - other.echo;
	}

	@Override
	public boolean equals(final Object o) {
		if (!(o instanceof Question)) {
			return false;
		}
		final Question other = (Question) o;

		return key.equals(other.key);

	}

}
